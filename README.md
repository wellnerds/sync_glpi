# 🚀 GLPI Integration Service (.NET)

Projeto desenvolvido para demonstrar integração corporativa com o GLPI utilizando **API REST** e **API SOAP**, aplicando boas práticas de arquitetura em .NET.

---

## 📌 Sobre o projeto

Este projeto iniciou como um serviço de sincronização com GLPI e evoluiu para uma solução completa de integração, permitindo comunicação entre sistemas modernos (REST) e sistemas legados (SOAP).

---

## 🧱 Arquitetura

O projeto segue princípios de Clean Architecture:

* **Domain** → Entidades de negócio
* **Application** → Regras e casos de uso
* **Infrastructure** → Integração com GLPI (REST API)
* **API** → Endpoints REST
* **SOAP Service** → Integração com sistemas legados
* **Worker** → Sincronização automática

---

## 🔌 Funcionalidades

### ✅ Integração REST (GLPI)

* Criar chamados
* Consultar tickets
* Atualizar status
* Listar usuários

### ✅ Serviço SOAP

* CreateTicket
* GetTicket
* UpdateTicket

### 🔄 Sincronização automática

* Sincronização de dados com GLPI via BackgroundService

---

## ⚙️ Tecnologias

* .NET 8
* ASP.NET Core
* WCF / CoreWCF
* HttpClient
* Serilog
* Swagger
* xUnit + Moq

---

## 🔄 Fluxo de integração

SOAP Client → Serviço SOAP → API REST (.NET) → GLPI

---

## 🧪 Testes

* Testes unitários com xUnit
* Mock de integrações externas

---

## ▶️ Como executar

```bash
git clone https://github.com/wellnerds/sync_glpi
cd sync_glpi
dotnet run
```

---

## 📊 Observabilidade

* Logs estruturados com Serilog
* Monitoramento de erros e integrações externas

---

## 📌 Diferenciais técnicos

* Integração híbrida (SOAP + REST)
* Arquitetura limpa
* Código desacoplado e testável
* Preparado para ambiente corporativo

---

## 👨‍💻 Autor

Desenvolvedor Wellington Ferreira .NET com foco em integração de sistemas e APIs corporativas.
