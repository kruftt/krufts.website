// 'use client'

// import { useCallback, useState } from 'react';
// import sections from './entries.json'
// import { cn } from '@/lib/utils';


// export default function WGSLReference () {
//   console.log(sections);
//   return (
//     <div className='ml-4 select-none'>
//       {
//         sections.map((section) => {
//           return (
//             <ReferenceSection key={section.name} section={section}></ReferenceSection>
//           )
//         })
//       }
//     </div>
//   )
// }

// function ReferenceSection({ section, ...props }: { section: { name: string, funcs: Record<string, any> } } & React.HTMLAttributes<HTMLDivElement>) {
//   const [expanded, setExpanded] = useState(true);
//   const [activeFunc, setActiveFunc] = useState<ReferenceFunc|null>(null);

//   const expand = useCallback(() => {
//     setExpanded(!(expanded))
//   }, [expanded, setExpanded]);

//   const setFunc = useCallback((f: ReferenceFunc) => {
//     setActiveFunc((f === activeFunc) ? null : f);
//   }, [activeFunc]);

//   return (
//     <div key={section.name} className='mb-4'>
//       <h3 onClick={expand} className='text-xl cursor-pointer'>{section.name}</h3>
//       { expanded &&
//         <div className='ml-4 flex gap-x-4 flex-wrap items-start cursor-pointer'>
//           {
//             Object.values(section.funcs).map((func, i) => {
//               return (<span key={i} onClick={() => setFunc(func)}>{func.name}</span>)
//             })
//           }
//         </div>
//       }
//       {expanded && activeFunc && <ReferenceSectionFunc className='ml-8' func={activeFunc} />}
//     </div>
//   )
// }

// interface ReferenceFunc {
//   name: string
//   implementations: [
//     ReferenceImplementation
//   ]
//   returns?: string
// }

// function ReferenceSectionFunc({ func, ...props } : { func: ReferenceFunc} & React.HTMLAttributes<HTMLLIElement>) {
//   const [expanded, setExpanded] = useState(true);

//   const expand = useCallback(() => {
//     setExpanded(!(expanded))
//     console.log(expanded);
//   }, [expanded, setExpanded]);

//   return (
//     <div className={cn('mt-4 mb-8', props.className)}>
//       <div onClick={expand} className='cursor-pointer'>{func.name}</div>
//       <ul className={cn('text-sm ml-4', expanded ? 'mt-1' : '')}>
//         { expanded && 
//             func.implementations.map((impl, i) => 
//               <ReferenceImplementation key={i} impl={impl} />
//             )
//         }
//       </ul>
//     </div>
//   )
// }

// interface ReferenceImplementation {
//   sig: string
//   params: string
//   desc: string
// }

// function ReferenceImplementation({ impl }: { impl: ReferenceImplementation } & React.HTMLAttributes<HTMLLIElement>) { 
//   const [expanded, setExpanded] = useState(true);

//   const expand = useCallback(() => {
//     setExpanded(!(expanded))
//     console.log(expanded);
//   }, [expanded, setExpanded]);

//   return (
//     <li>
//       <div onClick={expand} className={cn(
//         'cursor-pointer',
//         // expanded ? 'font-bold' : ''
//         )}>{impl.sig}</div>
//       { expanded && 
//         <ul className='ml-10 mb-4 list-disc'>
//           <li key={0}>{impl.params}</li>
//           <li key={1}>{impl.desc}</li>
//         </ul>
//       }
//     </li>
//   )
// }