import { motion } from "framer-motion";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <main
      className="relative flex min-h-screen cursor-pointer items-center justify-center overflow-hidden bg-zinc-950 text-white"
      onClick={() => navigate("/editor")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-semibold tracking-tight">
          Logic Studio
        </h1>

        <motion.p
          className="mt-4 text-sm text-zinc-400"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Click anywhere to continue
        </motion.p>
      </motion.div>
    </main>
  );
}

export default Home;