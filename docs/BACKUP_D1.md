# Backup do Cloudflare D1

Use este processo antes de alterações grandes ou em rotina semanal.

## Exportar backup remoto

```powershell
npx wrangler d1 export easyclean-db --remote --output backups/easyclean-db-YYYY-MM-DD.sql
```

## Confirmar tabelas principais

```powershell
npx wrangler d1 execute easyclean-db --remote --command "SELECT COUNT(*) AS total FROM orders;"
npx wrangler d1 execute easyclean-db --remote --command "SELECT COUNT(*) AS total FROM users;"
```

## Observações

- Guardar backups fora do repositório se contiverem dados pessoais.
- Nunca publicar ficheiros `.sql` com dados reais no GitHub público.
- Antes de restaurar qualquer backup, confirmar ambiente e base de destino.
