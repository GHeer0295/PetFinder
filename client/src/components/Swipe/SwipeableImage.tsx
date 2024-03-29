import React, { useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import "./SwipeableImage.css";
import { IoHeartCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { API, Direction } from "../../resources/TinderCard";
import img from "../../resources/sample-1.jpg";
import img2 from "../../resources/sample-2.jpg";
import img3 from "../../resources/sample-3.jpg";

interface Character {
  name: string;
  url: string;
}

const db: Character[] = [
  {
    name: "Erlich",
    url: img,
  },
  {
    name: "Monica",
    url: img2,
  },
  {
    name: "Jared",
    url: img3,
  },
  {
    name: "Dinesh",
    url: img,
  },
];

const SwipeableImage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
  const [hiddenCards, setHiddenCards] = useState<string[]>([]);
  const [likeRequirement, setLikeRequirement] = useState<boolean>(false);
  const [skipRequirement, setSkipRequirement] = useState<boolean>(false);
  const [skipHovered, setSkipHovered] = useState<boolean>(false);
  const [likeHovered, setLikeHovered] = useState<boolean>(false);

  const currentIndexRef = useRef<number>(currentIndex);

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

  const childRefs = useRef<Array<React.RefObject<API>>>(
    Array(db.length)
      .fill(0)
      .map(() => React.createRef<API>())
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    updateCurrentIndex(index - 1);
    setLikeRequirement(false);
    setSkipRequirement(false);
    setTimeout(() => {
      setHiddenCards([...hiddenCards, nameToDelete]);
    }, 200);
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < db.length) {
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
      db.map((character, index) => {
        if (hiddenCards.includes(character.name)) return null;
        return (
          <TinderCard
            ref={childRefs.current[index]}
            className="swipe"
            key={character.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
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
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), url(${character.url})`,
              }}
              className="card"
            >
              <h1>{character.name}</h1>
            </div>
          </TinderCard>
        );
      }),
    [db, hiddenCards, img]
  );

  if (hiddenCards.length === db.length) {
    return null;
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
            color: likeRequirement || likeHovered ? "#21ff19" : "#ffffff",
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
