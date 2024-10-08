"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle, X } from "lucide-react";
import { MockInterview, ObjectiveMock } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const AddObjectiveQuestions = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [keyword, setKeyword] = useState();
  const [techStack, setTechstack] = useState();
  const [level, setLevel] = useState();

  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // try {
    const InputPrompt =
      "Type of question: " +
      techStack +
      ", Level of question: " +
      level +
      ", and" +
      keyword +
      `- Based on this information, generate 10 objective interview questions along with 4 options and their answers in this JSON structure without any extra space in between - {"question": "", "options": [], "answer": ""}`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(ObjectiveMock)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          techStack: techStack,
          level: level,
          keyword: keyword,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp) {
        router.push(
          "/dashboard/interview/" + resp[0]?.mockId + "/objectiveTest"
        );

        setOpenDialog(false);
      }
    } else {
      console.log("ERROR");
    }
    // } catch (error) {
    //   toast({
    //     description: "Please try again!!",
    //     action: <X className="text-red-600" />,
    //   });
    // }

    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border-[2px] border-dotted border-gray-700 rounded-lg bg-slate-950 hover:scale-95 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        {/* <Plus className="h-12 w-12" /> */}
        <h2 className="text-lg text-center text-gray-500">
          Create New <br />
          <span className="font-semibold text-xl text-gray-400">
            Objective Round
          </span>
        </h2>
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

                  <div className="mt-3 my-7 text-black">
                    <label className="text-[1rem] font-semibold">
                      Tech Stack
                    </label>
                    <Input
                      className="mt-2"
                      placeholder="Ex. General Aptitude, Javascript, CSS"
                      required
                      onChange={(event) => setTechstack(event.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-4 text-black">
                    <label className="text-[1rem] font-semibold">
                      Level of Questions
                    </label>
                    <Input
                      className="mt-2"
                      placeholder="Ex. Beginner, Intermediate, Advanced"
                      required
                      onChange={(event) => setLevel(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-7 text-black">
                    <label className="text-[1rem] font-semibold">
                      Enter any keyword (Optional)
                    </label>
                    <Input
                      className="mt-2"
                      placeholder="Ex. Code based, Function based"
                      onChange={(event) => setKeyword(event.target.value)}
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

export default AddObjectiveQuestions;
