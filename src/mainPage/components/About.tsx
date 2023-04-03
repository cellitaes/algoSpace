import "./About.css";
import "../../shared/utils/css/Paragraph.css";

import featureList from "../../constants/features";

const About = () => {
  return (
    <div className="about">
      <div className="about__content">
        <ul className="about__unordered-list">
          {featureList.map((content) => (
            <li key={content.id} className="about__list-item">
              {!content.available && (
                <div className="about-list-item__not-available"></div>
              )}
              <div className="list-item__content">
                <img src={content.img} alt={content.text} />
                <p className="paragraph--normal-font">{content.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
