
  import React from 'react'
  import {motion} from "framer-motion" 
import { useAuth } from './context/auth'
  const Animate = ({app}) => {
    const {o} = useAuth()
    return (
<>
      {o?  <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ twice: true }}
        transition={{ease:"easeOut", duration: 1 }}
     
        variants={{
          visible: {x:0, opacity: 1, scale: 1 },
          hidden: {x:-100, opacity: 0, scale: 0.95 }
        }}
      >
        {app}
      </motion.div>: <div>{app}</div>}

      </>
    )
  }
  
  export default Animate