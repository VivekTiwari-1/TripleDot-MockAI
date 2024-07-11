"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/utils/db";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AlgoInterview, CodingInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";

const AddNewAlgoRound = () => {
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [language, setLanguage] = useState();
  const [jobExperience, setJobExperience] = useState();

  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const { user } = useUser();
  const router = useRouter();

  const onSubmitAlgo = async (e) => {
    e.preventDefault();

    setLoading(true);

    const InputPrompt =
      "Job position:" +
      jobPosition +
      ", Tech Stack:" +
      language +
      ", Years of experience:" +
      jobExperience +
      " - Based on this information, generate 1 algorithm question with clear explanation for the interview and its answer which contains best possible algorithm and its detailed explanation with time complexity in JSON format. Give question and answer as main fields with scenario, problem and requirements as sub-fields in question and algorithm, explanation and time complexity as sub-fields in answer in JSON format without any extra space in between.";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(AlgoInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          language: language,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: AlgoInterview.mockId });

      console.log(resp);
      if (resp) {
        setOpenDialog1(false);
        router.push(
          "/dashboard/interview/" + resp[0]?.mockId + "/algorithmRound"
        );
      }
    } else {
      console.log("ERROR");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog1(true)}
      >
        <h2 className="text-lg text-center">Add New Algo Round</h2>
      </div>
      <Dialog open={openDialog1}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmitAlgo}>
                <div>
                  <h2>
                    Add details about your job position/role, Job description
                    and years of experience
                  </h2>

                  <div className="mt-7 my-7 text-black">
                    <label className="text-[1rem] font-semibold">
                      Job Role/Job Position
                    </label>
                    <Input
                      className="mt-2"
                      placeholder="Ex. Software developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-7 text-black">
                    <label className="text-[1rem] font-semibold">
                      Programming Language
                    </label>
                    <Input
                      className="mt-2"
                      placeholder="Ex. Java, C++, Python, C# etc."
                      required
                      onChange={(event) => setLanguage(event.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-4 text-black">
                    <label className="text-[1rem] font-semibold">
                      Years of Experience
                    </label>
                    <Input
                      className="mt-2"
                      placeholder="Ex. 4"
                      type="number"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog1(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating Questions
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewAlgoRound;
