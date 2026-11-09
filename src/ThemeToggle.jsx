import React,{useEffect,useState} from 'react';
import './theme.css';

export default function ThemeToggle(){
 const [theme,setTheme]=useState(()=>{
  try { return localStorage.getItem('cycle-lab-theme')==='light'?'light':'dark'; }
  catch { return 'dark'; }
 });
 useEffect(()=>{
  document.documentElement.dataset.theme=theme;
  try { localStorage.setItem('cycle-lab-theme',theme); } catch { /* Storage is optional. */ }
 },[theme]);
 return <button className="theme-toggle" type="button" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={theme==='dark'?'Включить светлую тему':'Включить тёмную тему'}>
  <span aria-hidden="true">{theme==='dark'?'☀':'☾'}</span> {theme==='dark'?'Светлая тема':'Тёмная тема'}
 </button>;
}
