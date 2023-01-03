import { useState, useRef, useEffect } from 'react';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 1. This is the starting 
  // const prevCount = useRef();
  // useEffect(() => {
  //   prevCount.current = count;
  // }, [count]);

  const prevCount = usePrevious(count);
  const prevText = usePrevious(text);

  // 2. This is presenting the redundancy we are addressing
  // We can move this out into it's own helper function to create a custom hook
  // const prevText = useRef();
  // useEffect(() => {
  //   prevText.current = text;
  // }, [text]);

  return (
    <div className="App">
     <button onClick={() => setCount(count + 1)}>Increase the count</button>
     <p>Count: {count}</p>
     <p>Previous rendered count: {prevCount}</p>

     <input value={text} onChange={(event) => setText(event.target.value)} />
     <p>Previous rendered text: {prevText}</p>
    </div>
  );
}

// 3. Helper function to address the redunancy that exists
function usePrevious(value) {
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  // Get the previous value
  // This will allow the ability to use use the function in the jsx {}
  // Reason being we are assigning a value to the prevRef.current statement
  // The Dependency array then ensures we are waiting on the "value" before triggering
  return prevRef.current;
}