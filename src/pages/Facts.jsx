import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Facts() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/facts/funFacts"); }, []);
  return null;
}