import React, { useRef } from "react";
import { PostCard,SkeletonCard} from "../components";
import { useState  } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect } from "react";
import { useTitle } from "../hooks/useTitle";

export const HomePage = () => {
  const [postdata, setPostdata] = useState(new Array(2).fill(false));
  const postsRef = useRef(collection(db, "postdata"));
  const [toggle, setToggle] = useState(false);
  useTitle("HomePage");

  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(postsRef.current);
      setPostdata(
        data.docs.map((document) => ({ ...document.data(), id: document.id }))
      );
    }
   // console.log("----");
    getPosts();
  }, [toggle, postsRef]);

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet",
  //     description:
  //       "smfjkesnes nsui snsd sijvsiujvsdjiv nj iusdjvdsj s iuosdjvdsjiovjsdv jiuosjvsjdoivjdsv dsvdsiodjsvds sjosdjvsdvs xm io ",
  //     author: "samTech",
  //   },
  //   {
  //     id: 2,
  //     title: "second post data",
  //     description:
  //       "smfjkesnes nsui snsd sijvsiujvsdjiv nj iusdjvdsj s iuosdjvdsjiovjsdv jiuosjvsjdoivjdsv dsvdsiodjsvds sjosdjvsdvs xm io ",
  //     author: "RamTech",
  //   },
  // ];

  return (
    <section>
      {postdata.map((post, index) =>
        post ? (
          <PostCard
            key={post.id}
            post={post}
            toggle={toggle}
            setToggle={setToggle}
          />
        ) : (
          <SkeletonCard key={index} />
        )
      )}
    </section>
  );
};
