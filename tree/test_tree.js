import { Node, Tree } from "./tree.js";

const rootNode = new Node("1");
const child1 = new Node("2");
const child2 = new Node("3");
const child3 = new Node("oopsi");
const child1OfChild1 = new Node("4");
const child2OfChild1 = new Node("5");
const child3OfChild1 = new Node("6");
const child1OfChild2 = new Node("7");
const child2OfChild2 = new Node("8");
const child3OfChild2 = new Node("9");
const child1OfChild3 = new Node("10");
const child2OfChild3 = new Node("11");
const child3OfChild3 = new Node("12");

//root children
rootNode.appendChild(child1);
rootNode.appendChild(child2);
rootNode.appendChild(child3);

//children of each child from root (grandchildren)
child1.appendChild(child1OfChild1);
child1.appendChild(child2OfChild1);
child1.appendChild(child3OfChild1);

child2.appendChild(child1OfChild2);
child2.appendChild(child2OfChild2);
child2.appendChild(child3OfChild2);

child3.appendChild(child1OfChild3);
child3.appendChild(child2OfChild3);
child3.appendChild(child3OfChild3);



const myTree = new Tree(rootNode);


window.addEventListener("load", () => {
    myTree.dump();
    console.log(myTree.findValue("oopsi"));
    console.log(myTree.removeValue("oopsi"));
});
