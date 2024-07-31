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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle, Plus, X } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();

  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const InputPrompt =
        "Job position:" +
        jobPosition +
        ", Job Description:" +
        jobDesc +
        ", Years of experience:" +
        jobExperience +
        " - Based on this information, generate 5 interview questions and their answers in JSON format. Give questions and answers as fields in JSON";

      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log(MockJsonResp);
      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log(resp);
        if (resp) {
          setOpenDialog(false);
          router.push(
            "/dashboard/interview/" + resp[0]?.mockId + "/technicalRound"
          );
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border-[2px] border-dotted border-gray-800 rounded-lg bg-gradient-to-t from-gray-950 via-gray-800 to-gray-950 hover:scale-95 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        {/* <Plus className="h-12 w-12" /> */}
        <h2 className="text-lg text-center text-gray-500">Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
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
                      placeholder="Ex. Software Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-7 text-black">
                    <label className="text-[1rem] font-semibold">
                      Job Description/ Tech Stack (In short)
                    </label>
                    <Textarea
                      className="mt-2"
                      placeholder="Ex. Tech stacks(React), Behavioral questions, Situational Judgement questions"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
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
                    onClick={() => setOpenDialog(false)}
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

export default AddNewInterview;
