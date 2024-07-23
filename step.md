## 后端 
### 1. 启动 anvil
每秒自动创建一个新块，用于测试
```
anvil --block-time 1
```

### 2. 初始化项目
```
forge init backend --no-commit
```

### 3. 部署
```
forge create  src/Counter.sol:Counter  --rpc-url 127.0.0.1:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
输出
```
[⠒] Compiling...
No files changed, compilation skipped
Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Transaction hash: 0x9f128f09411e3b97e205ed0b594bfacaae38656424f01232a37a637610ba4f5d
```
其中 `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` 即为合约地址
## 前端 
### 1. 初始化项目
```
npx create-react-app frontend
```

### 2. 安装依赖
```
npm install ethers
```

### 3. 启动
```
npm start
```
---
参考
- [forge](https://getfoundry.sh/)