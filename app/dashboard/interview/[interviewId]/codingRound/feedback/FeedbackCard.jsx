"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FeedbackCard = ({ interview }) => {
  const [openDialog, setOpenDialog] = useState();
  return (
    <div className="">
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all w-[30vw]"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">See your Feedback</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <div className="my-8">
                <div className="mb-6">
                  <h1 className="text-xl font-semibold mb-4">Message</h1>
                  <p>{JSON.parse(interview?.feedback).message}</p>
                </div>
                <div className="mb-6">
                  <h1 className="text-xl font-semibold mb-4">Correctness</h1>
                  <p>{JSON.parse(interview?.feedback).correctness}</p>
                </div>
                <div className="mb-6">
                  <h1 className="text-xl font-semibold mb-4">Approach</h1>
                  <p>{JSON.parse(interview?.feedback).approach}</p>
                </div>
                <div className="mb-6">
                  <h1 className="text-xl font-semibold mb-4">Efficiency</h1>
                  <p>{JSON.parse(interview?.feedback).efficiency}</p>
                </div>
                <div className="mb-6">
                  <h1 className="text-xl font-semibold mb-4">Code Quality</h1>
                  <p>{JSON.parse(interview?.feedback).code_quality}</p>
                </div>
                <div className="mb-6">
                  <h1 className="text-xl font-semibold mb-4">Optimization</h1>
                  <p>{JSON.parse(interview?.feedback).optimization}</p>
                </div>
                <div className="mb-20">
                  <h1 className="text-xl font-semibold mb-4">
                    Overall Feedback
                  </h1>
                  <p>{JSON.parse(interview?.feedback).overall_feedback}</p>
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" onClick={() => setOpenDialog(false)}>
                  Go Back
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackCard;
