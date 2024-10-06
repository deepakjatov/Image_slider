import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // Import your CSS file

const ImageSlider = () => {
    const nextBtnRef = useRef(null);
    const prevBtnRef = useRef(null);
    const listRef = useRef(null);
    const [autoSlideEnabled, setAutoSlideEnabled] = useState(false);
    const timeAutoNext = 7000; // Time interval for auto-slide

    useEffect(() => {
        let runNextAuto;

        const startAutoSlide = () => {
            runNextAuto = setTimeout(() => {
                showSlider('next');
                startAutoSlide();
            }, timeAutoNext);
        };

        const stopAutoSlide = () => {
            clearTimeout(runNextAuto);
        };

        if (autoSlideEnabled) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }

        return () => clearTimeout(runNextAuto); // Clean up the timeout on component unmount
    }, [autoSlideEnabled]);

    const showSlider = (type) => {
        const sliderItems = listRef.current.children;

        if (type === 'next') {
            listRef.current.appendChild(sliderItems[0]); // Move first item to the end
        } else {
            listRef.current.prepend(sliderItems[sliderItems.length - 1]); // Move last item to the front
        }
    };

    const toggleAutoSlide = () => {
        setAutoSlideEnabled((prev) => !prev); // Toggle the state
    };

    return (
        <div>
            <header>
                <nav>
                    <a href="#" className="active">Home</a>
                    <a href="#">About</a>
                    <a href="#">Portfolio</a>
                    <a href="#">Services</a>
                    <a href="#">Contact</a>
                </nav>
                <button id="enableAutoSlide" className="enable-auto-slide" onClick={toggleAutoSlide}>
                    {autoSlideEnabled ? '❚❚' : '►'}
                </button>
            </header>
            <div className="carousel">
                <div className="list" ref={listRef}>
                    {[
                        { name: 'EAGLE', img: '/images/eagle1.jpg' },
                        { name: 'OWL', img: '/images/owl1.jpg' },
                        { name: 'CROW', img: '/images/crow.jpg' },
                        { name: 'BUTTERFLY', img: '/images/butterfly1.jpeg' },
                        { name: 'OWL', img: '/images/owl2.jpg' },
                        { name: 'EAGLE', img: '/images/eagle3.jpg' },
                        { name: 'KINGFISHER', img: '/images/kingfisher2.jpeg' },
                        { name: 'PARROT', img: '/images/parrot2.jpg' },
                        { name: 'HERON', img: '/images/heron.jpeg' },
                        { name: 'BUTTERFLY', img: '/images/butterfly2.jpg' },
                        { name: 'PARROT', img: '/images/parrot2.jpg' },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="item"
                            style={{ backgroundImage: `url(${item.img})` }}
                        >
                            <div className="content">
                                <div className="title">SLIDER</div>
                                <div className="name">{item.name}</div>
                                <div className="des">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis culpa similique consequuntur, reprehenderit dicta repudiandae.</div>
                                <div className="btn">
                                    <button>See More</button>
                                    <button>Subscribe</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="arrows">
                    <button className="prev" ref={prevBtnRef} onClick={() => showSlider('prev')}>{'<'}</button>
                    <button className="next" ref={nextBtnRef} onClick={() => showSlider('next')}>{'>'}</button>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
