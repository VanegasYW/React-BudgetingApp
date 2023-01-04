import { API_BASE_URL } from "./config.js";

export const fetchAllBudgets = async () => {
  const res = await fetch(`${API_BASE_URL}/api/expenses`, {
    method: "GET"
  });
  return await res.json();
};

export const createBudget = async (budget) => {
  const res = await fetch(`${API_BASE_URL}/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(budget),
  });
  return await res.json();
};

export const updateBudget = async (budgetId, budget) => {
  const res = await fetch(`${API_BASE_URL}/api/expenses/${budgetId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(budget),
  });
  return await res.json();
};

export const deleteBudget = async (budgetId) => {
  const res = await fetch(`${API_BASE_URL}/api/expenses/${budgetId}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const fetchBudget = async (budgetId) => {
  const res = await fetch(`${API_BASE_URL}/api/expenses/${budgetId}`, {
    method: "GET",
  });
  return await res.json();
};
