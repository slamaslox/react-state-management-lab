import { useState } from "react";
import "./App.css";

const allZombies = [
  {
    id: 1,
    name: "Survivor",
    price: 12,
    strength: 6,
    agility: 4,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png",
  },
  {
    id: 2,
    name: "Scavenger",
    price: 10,
    strength: 5,
    agility: 5,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png",
  },
  {
    id: 3,
    name: "Shadow",
    price: 18,
    strength: 7,
    agility: 8,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png",
  },
  {
    id: 4,
    name: "Tracker",
    price: 14,
    strength: 7,
    agility: 6,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png",
  },
  {
    id: 5,
    name: "Sharpshooter",
    price: 20,
    strength: 6,
    agility: 8,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png",
  },
  {
    id: 6,
    name: "Medic",
    price: 15,
    strength: 5,
    agility: 7,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png",
  },
  {
    id: 7,
    name: "Engineer",
    price: 16,
    strength: 6,
    agility: 5,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png",
  },
  {
    id: 8,
    name: "Brawler",
    price: 11,
    strength: 8,
    agility: 3,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png",
  },
  {
    id: 9,
    name: "Infiltrator",
    price: 17,
    strength: 5,
    agility: 9,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png",
  },
  {
    id: 10,
    name: "Leader",
    price: 22,
    strength: 7,
    agility: 6,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png",
  },
];

function App() {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState([...allZombies]);
 
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"

  const totalStrength = team.reduce((sum, zombie) => sum + zombie.strength, 0);
  const totalAgility = team.reduce((sum, zombie) => sum + zombie.agility, 0);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddFighter = (fighter) => {
    const newMoneyAmmount = money - fighter.price;

    if (newMoneyAmmount >= 0) {
      // User has enough money to add fighter

      // Update money ammount
      setMoney(newMoneyAmmount);

      // Remove the fighter from the zombieFighters array
      const newZombieFightersArray = zombieFighters.filter(
        (z) => z.id !== fighter.id
      );
      setZombieFighters(newZombieFightersArray);

      // Add the fighter to the team array
      const newTeamArray = [...team, fighter];
      setTeam(newTeamArray);

      // Display message
      showMessage("Fighter added!");

    } else {
      // User has not enough money
      // Display message
      showMessage("Not enough money!", "error");

    }
  };

  const handleRemoveFighter = (fighter) => {
    const newMoneyAmmount = money + fighter.price;
    setMoney(newMoneyAmmount);

    // Remove the fighter from the team array
    const newTeamArray = team.filter((z) => z.id !== fighter.id);
    setTeam(newTeamArray);

    // Restore the fighter to the zombieFighters array
    const newZombieFightersArray = [...zombieFighters, fighter];
    setZombieFighters(newZombieFightersArray);

    // Display message
    showMessage("Fighter removed!");
  };

  return (
    <>
      <div>
        <h1>Zombie Figthers</h1>
        {message && ( // Only render the <p> if message exists
          <p className={`message ${messageType}`}>{message}</p>
        )}
      </div>
      <div>
        <p>Money: ${money}</p>
        <p>Strength: {totalStrength}</p>
        <p>Agility: {totalAgility}</p>
      </div>
      <div className="card">
        <h2>Team</h2>
        {team.length === 0 ? (
          <p>Pick some team members!</p>
        ) : (
          <ul>
            {team.map((zombie) => (
              <li key={zombie.id}>
                <h3>{zombie.name}</h3>
                <img src={zombie.img} alt={zombie.name} />
                <p>Price: ${zombie.price}</p>
                <p>Strength: {zombie.strength}</p>
                <p>Agility: {zombie.agility}</p>
                <button onClick={() => handleRemoveFighter(zombie)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card">
        <h2>Zombies</h2>
        <ul>
          {zombieFighters.map((zombie) => (
            <li key={zombie.id}>
              <h3>{zombie.name}</h3>
              <img src={zombie.img} alt={zombie.name} />
              <p>Price: ${zombie.price}</p>
              <p>Strength: {zombie.strength}</p>
              <p>Agility: {zombie.agility}</p>
              <button onClick={() => handleAddFighter(zombie)}>
                Add To Team
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
