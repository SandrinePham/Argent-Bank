import PropTypes from "prop-types";
import "./featureIcon.scss";

function FeatureIcon({ image, title, description }) {
  return (
    <div className="feature-icon">
      <img src={image} alt={title} className="feature-icon-img" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureIcon;

FeatureIcon.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

