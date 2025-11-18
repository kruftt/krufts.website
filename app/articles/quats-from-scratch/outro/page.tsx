'use client'

import { useEffect, useRef, useState } from 'react';
import { QuatsHeader } from '../components';


export default () => {

  return (
    <div>
      <QuatsHeader>
        {"The End"}
        {"... for now"}
      </QuatsHeader>
      
      <p>
        I hope you enjoyed exploring these wonderful mathematical objects with me. In the future I would like to extend this article to include sections on composition and interpolation, with comparisons to matrix operations. Check back later for more!
      </p>
    </div>
  )
}
