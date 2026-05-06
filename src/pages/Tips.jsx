import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Tips() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/tips/health"); }, []);
  return null;
}