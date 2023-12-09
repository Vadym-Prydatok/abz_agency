import * as React from "react";
import { Button } from "../modules/Button";
import { scrollToAnchor } from "../utils/scrollToAnchor";
import gsap from "gsap";

export const TopSection = () => {
  React.useEffect(() => {
    gsap.fromTo(
      "section div div div div",
      {
        opacity: 0,
        y: -80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
      },
    );
  }, []);
  return (
    <section>
      <div className="bg-[url('./assets/img/head.jpeg')] h-[500px] bg-cover bg-center lg:h-[650px]">
        <div className="h-full duration-300 bg-black_cover">
          <div className="container">
            <div className="flex flex-col gap-y-8 text-white max-w-[380px] items-center m-auto text-center pt-10 md:pt-[89px] lg:pt-[164px]">
              <div className="flex flex-col gap-y-[21px]">
                <h1>Test assignment for front-end developer</h1>
                <p>
                  What defines a good front-end developer is one that has
                  skilled knowledge of HTML, CSS, JS with a vast understanding
                  of User design thinking as they'll be building web interfaces
                  with accessibility in mind. They should also be excited to
                  learn, as the world of Front-End Development keeps evolving.
                </p>
              </div>

              <div className="text-black">
                <Button onClick={() => scrollToAnchor('regForm')}>Sign up</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
