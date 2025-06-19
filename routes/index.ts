import { Router } from 'express';
const router = Router();

// Definindo o formato dos nossos dados
interface Carro {
  id: string;
  nome: string;
  imagem: string;
  alt: string;
  info: string;
  preco: string;
}

// ===================================================================
// 1. NOSSO "BANCO DE DADOS" CENTRAL COM TODOS OS CARROS DO ESTOQUE
// ===================================================================
const estoqueCompleto: Carro[] = [
  {
    id: 'modalLamborghini',
    nome: 'LAMBORGHINI Aventador',
    imagem: '/img/products/lamborghini.jpg',
    alt: 'Lamborghini Aventador',
    info: '2022/2022 - 300 KM',
    preco: 'R$4.500.000,00'
  },
  {
    id: 'modalLotusEvora', // ID corrigido para evitar duplicidade
    nome: 'LOTUS Evora',
    imagem: '/img/products/aspiration-4927227.jpg',
    alt: 'Lotus Evora',
    info: '2018/2018 - 30.000 KM',
    preco: 'R$650.000,00'
  },
  {
    id: 'modalMustang1970',
    nome: 'FORD Mustang',
    imagem: '/img/products/mustang-tails-2428590.jpg',
    alt: 'Mustang 1970',
    info: '1970/1970 - 20.000 KM',
    preco: 'R$250.000,00'
  },
  {
    id: 'modalFerrari458',
    nome: 'FERRARI 458 Italia',
    imagem: '/img/products/ferrari-about.jpg',
    alt: 'Ferrari 458 Italia',
    info: '2011/2011 - 15.000 KM',
    preco: 'R$2.100.000,00'
  },
  {
    id: 'modalMustang2016',
    nome: 'FORD Mustang',
    imagem: '/img/products/mustang.jpg',
    alt: 'Ford Mustang',
    info: '2016/2016 - 15.000 KM',
    preco: 'R$360.000,00'
  },
  {
    id: 'modalPaganiUtopia',
    nome: 'PAGANI Utopia',
    imagem: '/img/products/pagani-utopia.jpg',
    alt: 'Pagani Utopia',
    info: '2022/2022 - 0 KM',
    preco: 'R$ 60.000.000,00'
  },
  {
    id: 'modalAudiRS6',
    nome: 'AUDI RS6 Avant',
    imagem: '/img/products/audi-rs6-avant.jpg',
    alt: 'Audi RS6 Avant',
    info: '2024/2024 - 5.000 KM',
    preco: 'R$ 1.200.000,00'
  },
  {
    id: 'modalFerrari296',
    nome: 'FERRARI 296 GTB',
    imagem: '/img/products/ferrari-296.jpg',
    alt: 'Ferrari 296 GTB',
    info: '2024/2024 - 0 KM',
    preco: 'R$ 3.500.000,00'
  },
  {
    id: 'modalLamborghiniRevuelto',
    nome: 'LAMBORGHINI Revuelto',
    imagem: '/img/products/lamborghini-revuelto.jpg',
    alt: 'Lamborghini Revuelto',
    info: '2023/2023 - 0 KM',
    preco: 'R$7.500.000,00'
  }
];

// ===================================================================
// 2. DEFININDO AS ROTAS E QUAIS DADOS CADA UMA ENVIA
// ===================================================================

/* Rota para a PÁGINA INICIAL (DESTAQUES) */
router.get('/', function(req, res, next) {
  // Pega apenas os 3 primeiros carros da lista para serem os destaques
  const carrosDestaque = estoqueCompleto.slice(0, 3);

  res.render('index', { 
    title: 'Automobile | Home',
    carros: carrosDestaque // Envia a lista LIMITADA para o index.ejs
  });
});

/* Rota para a PÁGINA DE ESTOQUE (COMPLETO) */
router.get('/estoques', function(req, res, next) {
    res.render('estoques', { 
      title: 'Automobile | Nosso Estoque',
      carros: estoqueCompleto // Envia a lista COMPLETA para o estoque.ejs
    });
});


export default router;