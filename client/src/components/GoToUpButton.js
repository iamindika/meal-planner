import  {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import './GoToUpButton.scss';

export default function GoToUpButton(){
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 100){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
        <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 60, display: showScroll ? 'flex' : 'none'}}/>
  );
}
