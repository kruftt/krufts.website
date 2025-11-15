'use client'
import MathInline from '@/components/general/math-inline';
import { QuatsHeader } from '../components';
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

export default function Page0() {
  return (
    <article>
      <QuatsHeader>
        {"Dimension 0"}
        {"Let There Be ..."}
      </QuatsHeader>
      
      <img src="/img/math/zero.png" className="max-w-7/8 max-h-20 m-auto mb-4" alt="Zero." />
      
      <p>
        The word "dimension" means "to measure apart". In 0 dimensions, there is no way to "measure apart" from the origin. The meaning of "origin" is "to begin", "to rise", and "to come forth". We have the reference point from which we could potentially measure, but no dimension defined in which to do so. The only action we can take is to stay where we are, because there is nowhere else to go. The beginning and the end are one, a singularity.
      </p>
      
      <div className="w-full flex flex-col text-center gap-4">
        <MathInline>p=0</MathInline>
        <div className="flex justify-center gap-6">
          <Button
            className={cn(
              'pl-4 pr-4 rounded-2xl text-sm border-1 border-gray-500 ',
              'drop-shadow-sm hover:drop-shadow-lg',
              'active:text-white',
              'bg-gray-100 hover:bg-white active:bg-black',
            )}
            variant={'default'}
          >
            <MathInline>0</MathInline>
          </Button>
        </div>
      </div>

    </article>
  );
}
