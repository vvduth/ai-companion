"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import axios from "axios";

const ProModal = () => {
  const proModal = useProModal();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  // only load when we finished server sdie rendering and begin to load client side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href= res.data.url
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create <span className="text-sky-500 font-medium">Custom AI </span>{" "}
            companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9<span className="text-sm font-normal">.99 / mo</span>
          </p>
          <Button onClick={onSubscribe} disabled={isLoading} variant={"premium"}>Subscribe</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
