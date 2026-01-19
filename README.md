## 📘 About This Repository

This project is maintained for personal reference and focuses on reviewing fundamental **CRUD** concepts and basic **authentication** flows implemented with **Supabase**.

**Purpose:**
- Reinforce CRUD fundamentals  
- Practice user authentication (login and signup flows)  
- Serve as a quick lookup for Supabase usage  
- Act as a lightweight learning reference  

---

## ⏳ TL;DR

<h3 align="center">CRUD</h3>

### 🟢 **CREATE request**
```js
await supabase.from('tableName').insert({ key: value, key: value, etc: "..." })
```
### 🔵 READ/GET all request
```js
await supabase.from('tableName').select();
```

### 🟡 READ/GET specific request
```js
await supabase.from('tableName').select().eq("id", id).single();
```

### 🟠 UPDATE request
```js
await supabase.from('tableName').update({ key: value, etc: "..." }).eq("id", id)
```

### 🔴 DELETE request
```js
await supabase.from('tableName').delete().eq("id", id)
```
