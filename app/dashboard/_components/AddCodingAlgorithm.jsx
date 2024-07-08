import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const AddCodingAlgorithm = () => {
  const router = useRouter();

  const openSection = () => {
    const mockId = uuidv4();
    router.push("/dashboard/interview/" + mockId + "/codingAndAlgorithm");
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={openSection}
      >
        <h2 className="text-lg text-center text-green-400">
          Add Coding & Algorithm Interview
        </h2>
      </div>
    </div>
  );
};

export default AddCodingAlgorithm;
