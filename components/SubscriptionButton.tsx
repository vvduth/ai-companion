"use client";
import React, { useState } from "react";
import { boolean } from "zod";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Soemthing went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      size={"sm"}
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage subscription" : "premium"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
