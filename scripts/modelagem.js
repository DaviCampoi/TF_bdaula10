db.clientes.insertMany([
  { _id: new ObjectId("64b3f00000000000000001a"), nome: "João Silva" },
  { _id: new ObjectId("64b3f00000000000000001b"), nome: "Maria Oliveira" }
]);

db.entregadores.insertMany([
  { _id: new ObjectId("64b3e00000000000000001a"), nome: "Carlos Mendes" },
  { _id: new ObjectId("64b3e00000000000000001b"), nome: "Ana Souza" }
]);

db.pedidos.insertMany([
  {
    cliente_id: new ObjectId("64b3f00000000000000001a"),
    entregador_id: new ObjectId("64b3e00000000000000001a"),
    data: new Date("2024-04-01T00:00:00Z"),
    status: "entregue",
    local: {
      type: "Point",
      coordinates: [-46.6333, -23.5505]
    },
    produtos: [
      { nome: "Pizza Calabresa", preco: 35 },
      { nome: "Coca-Cola 2L", preco: 10 }
    ]
  },
  {
    cliente_id: new ObjectId("64b3f00000000000000001b"),
    entregador_id: new ObjectId("64b3e00000000000000001b"),
    data: new Date("2024-04-01T00:00:00Z"),
    status: "entregue",
    local: {
      type: "Point",
      coordinates: [-46.6400, -23.5500]
    },
    produtos: [
      { nome: "Hambúrguer", preco: 25 },
      { nome: "Coca-Cola 2L", preco: 10 }
    ]
  }
]);
