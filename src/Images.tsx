import { useEffect, useState } from "react";

const Images = () => {
  const [images, setImages] = useState([]);
  //   useEffect(() => {
  //     console.log("yo");
  //     const getImages = async (term: string) => {
  //       const response = await fetch(
  //         `https://api.unsplash.com/search/photos/?query=${term}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization:
  //               "Client-ID VwoIB99lk8NOS9p2lJuwYczmxO7PDlQDxieAfrtE3Xk",
  //           },
  //         }
  //       );
  //       const parsedResponse = await response.json();
  //       const { results } = parsedResponse;
  //       setImages(results);
  //     };
  //     getImages("goliath");
  //   }, []);

  const handleClick = async () => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?per_page=2&query=rocks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Client-ID VwoIB99lk8NOS9p2lJuwYczmxO7PDlQDxieAfrtE3Xk",
        },
      }
    );
    const parsedResponse = await response.json();
    const { results } = parsedResponse;
    setImages(results);
  };

  const formattedImages = images.map((image: any) => {
    return (
      <img src={image.urls.small} width="100" alt={image.alt_description} />
    );
  });

  return (
    <div className="images">
      <button onClick={handleClick}>get images</button>
      <div>{formattedImages}</div>
    </div>
  );
};
export default Images;
