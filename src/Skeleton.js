import { useEffect, useState } from "react/cjs/react.development";

const Skeleton = () => {
  const imgSrc = "https://i.imgur.com/NL4X06F.png";
  const [throwError, setThrowError] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      console.error("bahi error ho gai");
      setThrowError(true);
    }, 10000);

    return () => {
      clearTimeout(time);
    };
  }, []);

  if (throwError) throw new Error("too long");

  function makeSkeletonElements(count) {
    const divArr = [];
    for (let i = 0; i < count; i++) {
      divArr.push(
        <div key={i} className="skeleton-element">
          <img src={imgSrc} alt="placeholder" />
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
    return divArr;
  }

  return <div className="skeleton">{makeSkeletonElements(15)}</div>;
};

export default Skeleton;
