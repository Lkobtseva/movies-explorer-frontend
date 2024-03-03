import React from 'react';

function Preloader(props) {
  const { isLoading } = props;
  const preloaderClassName = `preloader ${isLoading ? "preloader_active" : ""}`
    return (
        <div className={preloaderClassName}>
            <div className="preloader__container">
                <span className="preloader__round"/>
            </div>
        </div>
    )
};

export default Preloader
