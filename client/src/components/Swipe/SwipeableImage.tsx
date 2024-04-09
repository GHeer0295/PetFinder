import React, { useMemo, useRef, useState, useEffect, useContext } from "react";
import TinderCard from "react-tinder-card";
import "./SwipeableImage.css";
import { IoHeartCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { API, Direction } from "../../resources/TinderCard";
import { like } from "../../services/interestService";

export interface PetPost {
  city: string;
  petName: string;
  postId: string;
  province: string;
  speciesNName: string;
  title: string;
  petImage: string;
}

interface SwipeableImageProps {
  data: PetPost[];
}

const SwipeableImage: React.FC<SwipeableImageProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(data.length - 1);
  const [hiddenCards, setHiddenCards] = useState<string[]>([]);
  const [likeRequirement, setLikeRequirement] = useState<boolean>(false);
  const [skipRequirement, setSkipRequirement] = useState<boolean>(false);
  const [skipHovered, setSkipHovered] = useState<boolean>(false);
  const [likeHovered, setLikeHovered] = useState<boolean>(false);
  const currentIndexRef = useRef<number>(currentIndex);
  const canSwipe = currentIndex >= 0;

  const childRefs = useRef<Array<React.RefObject<API>>>([]); // Initialize with an empty array

  useEffect(() => {
    setCurrentIndex(data.length - 1);
    currentIndexRef.current = currentIndex;
  
    childRefs.current = Array(data.length)
      .fill(0)
      .map(() => React.createRef<API>());
  }, [data]);

  const outOfFrame = (name: string, idx: number) => {
    setLikeRequirement(false);
    setSkipRequirement(false);
    console.log(name + " left the screen!");
    currentIndexRef.current >= idx &&
      childRefs.current[idx].current?.restoreCard();
  };

  const handleSwipeRequirementFulfilled = (direction: string) => {
    if (direction === "right") {
      setLikeRequirement(true);
    } else {
      setSkipRequirement(true);
    }
  };

  const handleSwipeRequirementUnFulfilled = () => {
    setLikeRequirement(false);
    setSkipRequirement(false);
  };

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = async (direction: string, postId: string, index: number) => {
    if (direction === 'right') {
      await like({postId});
    }
    updateCurrentIndex(index - 1);
    setLikeRequirement(false);
    setSkipRequirement(false);
    setTimeout(() => {
      setHiddenCards([...hiddenCards, postId]);
    }, 200);
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < data.length) {
      await childRefs.current[currentIndex].current?.swipe(dir);
    }
  };

  const handleIconEnter = (type: string) => {
    if (type === "skip") {
      setSkipHovered(true);
    } else if (type === "like") {
      setLikeHovered(true);
    }
  };

  const handleIconLeave = (type: string) => {
    if (type === "skip") {
      setSkipHovered(false);
    } else if (type === "like") {
      setLikeHovered(false);
    }
  };

  const tinderCards = useMemo(
    () =>
      data.map((petCard, index) => {
        if (hiddenCards.includes(petCard.postId)) return null;
        return (
          <TinderCard
            ref={childRefs.current[index]}
            className="swipe"
            key={petCard.postId}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, petCard.postId, index)}
            onCardLeftScreen={() => outOfFrame(petCard.petName, index)}
            onSwipeRequirementFulfilled={(dir) =>
              handleSwipeRequirementFulfilled(dir)
            }
            onSwipeRequirementUnfulfilled={() =>
              handleSwipeRequirementUnFulfilled()
            }
            swipeRequirementType="position"
            swipeThreshold={100}
          >
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), url(${petCard.petImage})`,
              }}
              className="card"
            >
              <h1>{petCard.petName}</h1>
            </div>
          </TinderCard>
        );
      }),
    [data, hiddenCards, childRefs.current]
  );

  if (hiddenCards.length === data.length || data.length === 0) {
    return (
      <div className="swipeable-container">
        <h1 className="empty-results">No Search Results</h1>
      </div>
    )
  }

  return (
    <div className="swipeable-container">
      <div className="cardContainer">{tinderCards}</div>
      <div className="iconContainer">
        <IconContext.Provider
          value={{
            color: skipRequirement || skipHovered ? "#ff2213" : "#ffffff",
            size: "75px",
          }}
        >
          <div
            className="skipIcon"
            onClick={() => swipe("left")}
            onMouseEnter={() => handleIconEnter("skip")}
            onMouseLeave={() => handleIconLeave("skip")}
          >
            <IoCloseCircleOutline />
          </div>
        </IconContext.Provider>
        <IconContext.Provider
          value={{
            color: likeRequirement || likeHovered ? "#97d672" : "#ffffff",
            size: "75px",
          }}
        >
          <div
            className="likeIcon"
            onClick={() => swipe("right")}
            onMouseEnter={() => handleIconEnter("like")}
            onMouseLeave={() => handleIconLeave("like")}
          >
            <IoHeartCircleOutline />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default SwipeableImage;
