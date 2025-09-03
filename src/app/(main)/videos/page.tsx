import Video from "@/components/video";
// import Videos from "@/components/videos/Videos";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="mt-0">
      {/* <Videos /> */}
      <Suspense>
        <Video />
      </Suspense>
    </div>
  );
};

export default page;
