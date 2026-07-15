// Cleaned App.jsx
import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import DashboardCards from "./components/DashboardCards/DashboardCards";
import WaitlistTable from "./components/WaitlistTable/WaitlistTable";
import AddPlayerModal from "./components/Modal/AddPlayerModal";
import EditPlayerModal from "./components/Modal/EditPlayerModal";
import SearchBar from "./components/SearchBar/SearchBar";
import Pagination from "./components/Pagination/Pagination";
import Analytics from "./components/Analytics/Analytics";
import Loader from "./components/Loader/Loader";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Footer from "./components/Footer/Footer";
import api from "./services/api";
import toast from "react-hot-toast";
import { exportPlayers } from "./utils/exportCSV";

function App() {
const [players,setPlayers]=useState([]);
const [loading,setLoading]=useState(true);
const [error,setError]=useState("");
const [openModal,setOpenModal]=useState(false);
const [editModal,setEditModal]=useState(false);
const [selectedPlayer,setSelectedPlayer]=useState(null);
const [deleteModal,setDeleteModal]=useState(false);
const [selectedDeletePlayer,setSelectedDeletePlayer]=useState(null);
const [search,setSearch]=useState("");
const [game,setGame]=useState("");
const [status,setStatus]=useState("");
const [priority,setPriority]=useState("");
const [currentPage,setCurrentPage]=useState(1);
const playersPerPage=5;

const fetchPlayers=async()=>{
 try{
  setLoading(true);
  const response=await api.get("/waitlist");
  setPlayers(response.data.players ?? []);
  setError("");
 }catch(err){
  console.error(err);
  setError("Failed to fetch players.");
 }finally{
  setLoading(false);
 }
};

useEffect(()=>{fetchPlayers();},[]);
useEffect(()=>{setCurrentPage(1);},[search,game,status,priority]);

const openDeleteModal=(player)=>{
 setSelectedDeletePlayer(player);
 setDeleteModal(true);
};

const handleDelete=async()=>{
 if(!selectedDeletePlayer) return;
 try{
  await api.delete(`/waitlist/${selectedDeletePlayer.id}`);
  toast.success("Player deleted successfully!");
  fetchPlayers();
 }catch(error){
  console.error(error);
  toast.error("Delete failed!");
 }finally{
  setDeleteModal(false);
  setSelectedDeletePlayer(null);
 }
};

const handleEdit=(player)=>{
 setSelectedPlayer(player);
 setEditModal(true);
};

const filteredPlayers=players.filter((player)=>{
 const matchesSearch=player.playerName.toLowerCase().includes(search.toLowerCase())||player.email.toLowerCase().includes(search.toLowerCase());
 const matchesGame=game===""||player.game===game;
 const matchesStatus=status===""||player.status===status;
 const matchesPriority=priority===""||player.priority===priority;
 return matchesSearch&&matchesGame&&matchesStatus&&matchesPriority;
});

const indexOfLastPlayer=currentPage*playersPerPage;
const indexOfFirstPlayer=indexOfLastPlayer-playersPerPage;
const currentPlayers=filteredPlayers.slice(indexOfFirstPlayer,indexOfLastPlayer);
const totalPages=Math.max(1,Math.ceil(filteredPlayers.length/playersPerPage));

if(loading){
 return(
  <MainLayout>
   <DashboardCards/>
   <Loader/>
  </MainLayout>
 );
}

if(error){
 return(
  <MainLayout>
   <div style={{background:"#7f1d1d",color:"white",padding:"20px",borderRadius:"12px",textAlign:"center"}}>
    <h2>⚠️ Something went wrong</h2>
    <p>{error}</p>
    <button onClick={fetchPlayers}>Retry</button>
   </div>
  </MainLayout>
 );
}

return(
<MainLayout>
<SearchBar
search={search}
setSearch={setSearch}
game={game}
setGame={setGame}
status={status}
setStatus={setStatus}
priority={priority}
setPriority={setPriority}
onAddPlayer={()=>setOpenModal(true)}
onExport={()=>exportPlayers(filteredPlayers)}
/>

<div id="dashboard"><DashboardCards/></div>
<div id="statistics"><Analytics players={players}/></div>
<div id="players">
<WaitlistTable players={currentPlayers} onDelete={openDeleteModal} onEdit={handleEdit}/>
</div>

<Pagination
currentPage={currentPage}
totalPages={totalPages}
onPrevious={()=>setCurrentPage(prev=>Math.max(prev-1,1))}
onNext={()=>setCurrentPage(prev=>Math.min(prev+1,totalPages))}
/>

<AddPlayerModal open={openModal} onClose={()=>setOpenModal(false)} onSuccess={fetchPlayers}/>
<EditPlayerModal open={editModal} player={selectedPlayer} onClose={()=>setEditModal(false)} onSuccess={fetchPlayers}/>
<DeleteModal open={deleteModal} player={selectedDeletePlayer} onCancel={()=>setDeleteModal(false)} onConfirm={handleDelete}/>
<div id="footer"><Footer/></div>
</MainLayout>
);
}

export default App;
