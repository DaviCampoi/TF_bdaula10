// a) Pedidos entregues por "Carlos Mendes"
const entregador = db.entregadores.findOne({ nome: "Carlos Mendes" });
if (entregador) {
  print("Pedidos entregues por Carlos Mendes:");
  db.pedidos.find({ entregador_id: entregador._id }).forEach(printjson);
} else {
  print("Entregador Carlos Mendes não encontrado.");
}

// b) Produtos e total de vendas
print("\nProdutos e total de vendas:");
db.pedidos.aggregate([
  { $unwind: "$produtos" },
  {
    $group: {
      _id: "$produtos.nome",
      total_vendido: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      produto: "$_id",
      total_vendido: 1
    }
  }
]).forEach(printjson);

// c) Pedidos perto da coordenada [-46.634, -23.551] em raio de 1 km
print("\nPedidos próximos a [-46.634, -23.551] (1km):");
db.pedidos.createIndex({ local: "2dsphere" });
db.pedidos.find({
  local: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-46.634, -23.551]
      },
      $maxDistance: 1000
    }
  }
}).forEach(printjson);

// d) Pedidos com "Pizza Calabresa"
print("\nPedidos com 'Pizza Calabresa':");
db.pedidos.find({
  "produtos.nome": "Pizza Calabresa"
}).forEach(printjson);

// e) Nome do cliente e produtos do pedido
print("\nNome do cliente e nomes dos produtos:");
db.pedidos.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "cliente"
    }
  },
  { $unwind: "$cliente" },
  {
    $project: {
      _id: 0,
      nome_cliente: "$cliente.nome",
      produtos: "$produtos.nome"
    }
  }
]).forEach(printjson);
