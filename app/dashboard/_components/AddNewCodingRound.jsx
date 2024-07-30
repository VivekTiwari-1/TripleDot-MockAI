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
import { CodingInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";

const AddNewCodingRound = () => {
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [language, setLanguage] = useState();
  const [jobExperience, setJobExperience] = useState();

  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const { user } = useUser();
  const router = useRouter();

  const onSubmitCode = async (e) => {
    e.preventDefault();

    setLoading(true);

    const InputPrompt =
      `I need to create a coding problem for the mock interview.` +
      "Job position: " +
      jobPosition +
      ", Years of experience: " +
      jobExperience +
      " -  Based on this information generate a problem and its solution in " +
      language +
      ` language in this JSON structure without any extra space in between - { "question": { "title": "", "difficulty": "", "description": "", "input_format": "", "output_format": "", "constraints": "", "sample_input": [ "", "" ], "sample_output": [ "", "" ], "explanation": "", "platform": "", "hint": "" }, "code_solution": { "explanation": "", "code": "","time_complexity":"","other_approach": "" } }`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    // console.log(MockJsonResp);
    console.log(JSON.parse(MockJsonResp));

    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(CodingInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          language: language,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: CodingInterview.mockId });

      console.log(resp);
      if (resp) {
        setOpenDialog2(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId + "/codingRound");
      }
    } else {
      console.log("ERROR");
    }

    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border-2 border-dotted border-gray-400 rounded-lg bg-gradient-to-tr from-gray-100 via-gray-300 to-gray-100 hover:scale-105 hover:shadow-sm cursor-pointer transition-all "
        onClick={() => setOpenDialog2(true)}
      >
        <h2 className="text-lg text-center">Add New Coding Round</h2>
      </div>
      <Dialog open={openDialog2}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Coding Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmitCode}>
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
                      placeholder="Ex. Java, Cpp or Python"
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
                    onClick={() => setOpenDialog2(false)}
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

export default AddNewCodingRound;
