import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;


let posts = [
  {
    id: 1,
    title: "Huawei's Advances in AI Chip Production Bolster China's Tech Ambitions",
    content: "Huawei has significantly improved its AI chip production, increasing the yield rate of its Ascend 910C processors from 20% to nearly 40%. This milestone not only makes production profitable but also aligns with China's goal of achieving self-sufficiency in advanced semiconductors. Despite challenges, including competition from industry leaders like Nvidia, Huawei plans to produce 100,000 Ascend 910C processors and 300,000 910B chips in 2025, contributing to the nation's AI industry growth.",
    author: "Liam Chen",
    date: "2025-02-25T14:30:00Z"
  },
  {
    id: 2,
    title: "Apple Commits $500 Billion to U.S. Investments Amid Economic Uncertainty",
    content: "Apple has unveiled a $500 billion investment plan in the United States over the next four years, aiming to create 20,000 new jobs and establish a major factory in Texas dedicated to artificial intelligence servers. This announcement comes as Wall Street faces further losses due to concerns over a potential economic slowdown and ongoing tariff issues. President Donald Trump praised Apple's move, viewing it as a vote of confidence in his administration's economic policies.",
    author: "Sophia Martinez",
    date: "2025-02-25T14:30:00Z"
  },
  {
    id: 3,
    title: "Apple Commits $500 Billion to U.S. Investments Amid Economic Uncertainty",
    content: "Apple has unveiled a $500 billion investment plan in the United States over the next four years, aiming to create 20,000 new jobs and establish a major factory in Texas dedicated to artificial intelligence servers. This announcement comes as Wall Street faces further losses due to concerns over a potential economic slowdown and ongoing tariff issues. President Donald Trump praised Apple's move, viewing it as a vote of confidence in his administration's economic policies.",
    author: "Sophia Martinez",
    date: "2025-02-25T14:30:00Z"
  },
  {
     id: 4,
     title: "JPMorgan Integrates AI to Enhance Banking Operations",
    content: "JPMorgan Chase, the largest bank in the United States, is increasingly incorporating artificial intelligence into its operations to boost productivity and customer service. The bank has introduced LLM Suite, a generative AI tool developed in collaboration with OpenAI, to over 200,000 employees, with about half actively using it. This tool assists in various functions, including client briefings, legal work, and call centers. JPMorgan emphasizes that AI is intended to augment, not replace, human labor, focusing on processing proprietary data to drive innovation and efficiency.",
    author: "Ava Thompson",
    date: "2025-02-25T14:30:00Z"
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/posts",(req,res)=>{
   res.json(posts);
});



app.get("/posts/:id",(req,res)=>{
     const id=parseInt(req.params.id);
     const post=posts.find((p)=>p.id===id);
     if(!post){
      res.sendStatus(404);
     }
     res.json(post);
     console.log(post);
});



app.post("/posts",(req,res)=>{
    const newp={
      id:posts.length+1,
      title:req.body.title,
      content:req.body.content,
      author:req.body.author,
      date:new Date()
    }
    posts.push(newp);
    res.json(newp).status(201);
});



app.patch("/posts/:id",(req,res)=>{
   const id=parseInt(req.params.id);
   const replace=posts.find(p=>p.id===id);
   const edited={
    id:id,
    title:req.body.title || replace.title,
    content:req.body.content || replace.content,
    author:req.body.author || replace.author,
    date:new Date(),
   }

   const ind=posts.findIndex(p=>p.id===id);
   posts[ind]=edited;
   
   res.json(201);


});



app.delete("/posts/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const ind=posts.findIndex(post=>post.id===id);
  console.log(ind);
  if(ind>=0){
   posts.splice(ind,1);
  res.status(201).json("ok");
  }
  else{
    res.status(404).json({message:"id doesn't exists"});
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
