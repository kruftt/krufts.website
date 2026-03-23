import ArticleHeader from "@/components/portfolio/article-header"
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"

const data: ArticleData = {
  title: 'USS Filters',
  tags: ['gamedev'],
  links: [
    // ['USS Filter Documentation', 'https://docs.unity3d.com/6000.3/Documentation/Manual/ui-systems/custom-filters.html']
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Unity 6.3 - USS Filters
      </ArticleHeader>
      <SectionTabs tabs={['Demo', 'Shader Code']}>
        <SectionTabsContent value='Demo'>
          <p>
            As part of an exploration into Unity 6.3, I implemented a custom USS (Unity Style Sheets) filter. Filters provide a method to do post-processing on UI Toolkit VisualElements, akin to CSS filters for HTML elements. VisualElements are first rendered into a texture and then fed into the filter, which is a shader program. Since Unity's Shader Graph visual language doesn't support filters, I had to write the shaders by hand and do some boilerplate to link them up with a style sheet property.
          </p>
          <p>
            In this small demo, I have three focusable VisualElements that make use of the same custom filter, but using different styling parameters. 
          </p>
          <br />
          <div>
            <YoutubeWrapper url="https://www.youtube.com/embed/nxeDLqcyLS0?si=aB2fSRuf5Y90reG9" />
          </div>
        </SectionTabsContent>
        <SectionTabsContent value="Shader Code">
          <pre className="bg-gray-100">
{`
  Shader "Custom/SH_Spirit"
  {
    Properties
    {
      [HideInInspector][MainTexture] _MainTex ("Texture", 2D) = "white" { }
      [NoScaleOffset] _NoiseMap ("Noise Map", 2D) = "white" { }
      [MainColor] _BaseColor("Base Color", Color) = (1, 1, 1, 1)
      _EffectColor ("Effect Color", Color) = (1, 1, 1, 1)
      _Scroll ("Noise Velocity Ax, Ay, Bx, By", Vector) = (0, 0, 0, 0)
      _Spread ("Offset x,y, Spread x,y", Vector) = (0, 0, 0, 0)
    }

    SubShader
    {
      Tags {"RenderType" = "Opaque"}
      Blend One Zero
      ZWrite Off
      ZTest Always
      Cull Off
    }

    Pass
    {
      HLSLPROGRAM

      #pragma vertex vert
      #pragma fragment frag

      #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
      #include "Packages/com.unity.render-pipelines.core/ShaderLibrary/Color.hlsl"

      struct Attributes
      {
        float4 positionOS : POSITION;
        float2 uv : TEXCOORD0;
      };

      struct Varyings
      {
        float4 positionHCS : SV_POSITION;
        float2 uv : TEXCOORD0;
      };

      TEXTURE2D(_MainTex);
      SAMPLER(sampler_MainTex);
      float4 _MainTex_TexelSize;

      TEXTURE2D(_NoiseMap);
      SAMPLER(sampler_NoiseMap);
      float4 _NoiseMap_TexelSize;

      CBUFFER_START(UnityPerMaterial)
        float4 _MainTex_ST;
        float4 _NoiseMap_ST;
        half4 _BaseColor;
        half4 _EffectColor;
        float4 _Scroll;
        float4 _Spread;
      CBUFFER_END


      // Vertex Shader
      Varyings vert(Attributes IN)
      {
        Varyings OUT;
        OUT.positionHCS = TransformObjectToHClip(IN.positionOS.xyz);
        OUT.uv = TRANSFORM_TEX(IN.uv, _MainTex);
        return OUT;
      }


      float GetSaturation(float4 c)
      {
        float maxC = max(c.r, max(c.g, c.b));
        float minC = min(c.r, min(c.g, c.b));
        float delta = maxC - minC;
        return c.a * ((maxC > 0.00001) ? delta / maxC : 0.0);
      }


      // Fragment Shader
      half4 frag(Varyings IN) : SV_Target
      {
        // Ground Sample
        half4 groundSample = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, IN.uv);

        // Noise Sample
        float noiseSampleDensity = 4.0;

        float2 uvNoise = float2(
          noiseSampleDensity * _NoiseMap_TexelSize.x,
          noiseSampleDensity * _NoiseMap_TexelSize.y
        );

        float4 _scroll = 100 * (LinearToSRGB(_Scroll) - 0.5);
        float4 _spread = LinearToSRGB(_Spread) - 0.5;

        half4 noiseSample = SAMPLE_TEXTURE2D(_NoiseMap, sampler_NoiseMap, float2(
          uvNoise.x * (_scroll.x * _Time[1] - _spread.x * _MainTex_TexelSize.z - IN.positionHCS.x),
          uvNoise.y * (_scroll.y * _Time[1] - _spread.y * _MainTex_TexelSize.w - IN.positionHCS.y)
        ));

        // Lerp with 2nd noise sample
        noiseSample = lerp(noiseSample,
          SAMPLE_TEXTURE2D(_NoiseMap, sampler_NoiseMap, float2(
            uvNoise.x * (_scroll.z * _Time[1] - _spread.x * _MainTex_TexelSize.z - IN.positionHCS.x),
            uvNoise.y * (_scroll.w * _Time[1] - _spread.y * _MainTex_TexelSize.w - IN.positionHCS.y)
          )),
        0.5);

        // Effect Sample
        float2 uvEffect = float2(
          IN.uv.x - (_spread.x + (noiseSample.r * _spread.z)),
          IN.uv.y - (_spread.y + (noiseSample.g * _spread.w))
        );

        // TODO: How does Unity calculate this padding?
        half4 effectSample = (
          uvEffect.x > 0.02 && uvEffect.x < .98
          && uvEffect.y > 0.033 && uvEffect.y < 0.92
        )
        ? SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, uvEffect)
        : half4(0, 0, 0, 0);


        float4 groundColor = groundSample * _BaseColor;

        // Effect Color
        float saturation = pow(max(0, GetSaturation(effectSample)), 4);
        float3 effectColor = saturation * float3(1, 1, 1) + (1 - saturation) * _EffectColor.rgb;
        float effectAlpha = _EffectColor.a * effectSample.a;

        // Alpha Blend
        return (_spread.y < 0)
          ? float4(
            (1 - groundColor.a) * effectAlpha * effectColor + groundColor.a * groundColor.rgb,
            1 - (1 - effectAlpha) * (1 - groundColor.a)
          )
          : float4(
            effectAlpha * effectColor + (1 - effectAlpha) * groundColor.rgb,
            1 - (1 - effectAlpha) * (1 - groundColor.a));
        }

        ENDHLSL
      }
    }
  }
`}
          </pre>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data