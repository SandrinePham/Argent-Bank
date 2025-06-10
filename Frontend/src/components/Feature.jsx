import FeatureIcon from "./FeatureIcon";
import Icon1 from "../assets/images/icon-chat.png";
import Icon2 from "../assets/images/icon-money.png";
import Icon3 from "../assets/images/icon-security.png";
import "./feature.scss";

function Feature() {
  return (
    <section className="features">
      <FeatureIcon
        image={Icon1}
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />
      <FeatureIcon
        image={Icon2}
        title="More savings means higher rates"
        description="The more you save with us, the higher your interest rate will be!"
      />
      <FeatureIcon
        image={Icon3}
        title="Security you can trust"
        description="We use top of the line encryption to make sure your data and money is always safe."
      />
    </section>
  );
}

export default Feature;
