import{L as a,M as n}from"./index.03b5aaf0.js";import{w as u}from"./index.d67a6375.js";const s="@dropdown",l=`${s}_isOpen`,d=()=>n(l)||!1,f=()=>{const p=d(),r=(()=>{const e=u({isOpen:p,shouldDispatchBlur:!1,buttonRef:null,arrowRef:null,tooltipRef:null,popperInstance:null});return{...e,closeDropdown:()=>e.update(t=>({...t,isOpen:!1,shouldDispatchBlur:!0})),setButtonRef:t=>e.update(o=>({...o,buttonRef:t})),setInstance:t=>e.update(o=>({...o,popperInstance:t})),setTooltipRef:t=>e.update(o=>({...o,tooltipRef:t})),setArrowRef:t=>e.update(o=>({...o,arrowRef:t})),openDropdown:()=>e.update(t=>({...t,isOpen:!0})),toggleIsOpen:()=>e.update(t=>({...t,isOpen:!t.isOpen}))}})();a(s,r)},O=()=>n(s);export{O as g,f as s};