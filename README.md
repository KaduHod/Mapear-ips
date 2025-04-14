# TreverseIps

Um utilitário Node.js para descobrir dispositivos conectados em redes locais através de ping.

## Descrição

O TreverseIps é uma ferramenta que permite escanear sua rede local para encontrar dispositivos conectados. Ele funciona da seguinte forma:

1. Detecta automaticamente as interfaces de rede disponíveis 
2. Para cada interface, varre todos os possíveis endereços IP (de .2 até .255)
3. Realiza ping em cada IP para verificar se há dispositivos respondendo
4. Salva a lista de IPs ativos em um arquivo

## Instalação

Certifique-se de ter o Node.js instalado no seu sistema.

```bash
# Clone o repositório
git clone [url-do-repositorio]
cd treverse-ips

# Instale as dependências
npm install
```

## Uso

```javascript
// Execute o arquivo principal
node index.js
```

Isso irá:
1. Executar a varredura de IPs na sua rede local
2. Salvar os resultados em um arquivo `ips.txt`

## Configuração

Você pode ajustar algumas configurações no código:

- `TreverseIps.baseIp`: Define o padrão de IP base se não for detectado automaticamente (padrão: '192.168.0.')
- `TreverseIps.verbose`: Ativa logs detalhados do processo (padrão: false)
- `TreverseIps.level`: Define a quantidade de pacotes de ping enviados (padrão: 10)

## Estrutura do Projeto

- `index.js`: Arquivo principal para execução do programa
- `treverseNetwork.js`: Contém a classe TreverseIps com a lógica de escaneamento
- `ips.txt`: Arquivo gerado com a lista de IPs encontrados

## Como Funciona

1. O programa verifica suas interfaces de rede usando o comando `ifconfig`
2. Para cada segmento de rede detectado, gera uma lista de possíveis IPs
3. Executa o comando `ping` para verificar quais IPs estão ativos
4. Os IPs que respondem são coletados e salvos no arquivo de saída

## Requisitos

- Node.js
- Sistema operacional com suporte ao comando `ifconfig` (Linux/Mac)
- Permissões para executar o comando `ping`

## Limitações

- O programa foi projetado principalmente para sistemas Unix/Linux
- Para Windows, pode ser necessário adaptar os comandos `ifconfig` e `ping`
- Leva tempo para escanear redes grandes devido aos múltiplos pings
