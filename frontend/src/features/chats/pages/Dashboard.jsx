import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useChats from "../hooks/useChats";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";



const Dashboard = () => {
  const navigate = useNavigate();
  let { initializeSocketConnection, handleGetChats, chats } = useChats()
  useEffect(() => {
    initializeSocketConnection()
    handleGetChats()
  }, [])

  return (
    <Layout>
      <Navbar />
      

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar hidden on small screens */}
        <div className="hidden md:block">
          <Sidebar chats={chats} />
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          <ChatArea />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;