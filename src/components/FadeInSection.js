import React from 'react';

const FadeInSection = props => {

    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef();

    React.useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
      });
      
      const currentDomRef = domRef.current;
      observer.observe(currentDomRef);
      return () => observer.unobserve(currentDomRef);
    }, []);

    return (
      <div
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
}

export default FadeInSection;