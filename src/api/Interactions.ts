import { Client } from "./Clients";
import { Service } from "./ServicesService";

const apiUrl = process.env.REACT_APP_API_URL;

export interface Interaction {
  id?: number;
  client?: Client;
  service?: Service;
  client_id?: number;
  service_id?: number;
  type: string;
  date_interaction?: Date;
  outcome: string;
  details?: string;
}

const getAllInteractions = async (currentPage: number = 1) => {
  try {
    const response = await fetch(`${apiUrl}/interactions?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const getInteractionById = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/interactions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const getDeletedInteractions = async (currentPage: number = 1) => {
  try {
    const response = await fetch(
      `${apiUrl}/interactions/trashed?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const updateInteraction = async (id: number, interactionData: Interaction) => {
  try {
    const updatedUser = {
      type: interactionData?.type || undefined,
      date_interaction: interactionData?.date_interaction || undefined,
      outcome: interactionData?.outcome || undefined,
      details: interactionData?.details || undefined,
    };

    const response = await fetch(`${apiUrl}/interactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
      body: JSON.stringify(updatedUser),
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const createNewInteraction = async (interaction: Interaction) => {
  try {
    const response = await fetch(`${apiUrl}/interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
      body: JSON.stringify({
        client_id: interaction.client_id,
        service_id: interaction.service_id,
        type: interaction.type,
        date_interaction: interaction.date_interaction,
        outcome: interaction.outcome,
        details: interaction.details || undefined,
      }),
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const restoreInteraction = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/interactions/${id}/restore`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const deleteInteraction = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/interactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const forceDeleteInteraction = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/interactions/${id}/force-delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export {
  getAllInteractions,
  getInteractionById,
  getDeletedInteractions,
  createNewInteraction,
  updateInteraction,
  deleteInteraction,
  restoreInteraction,
  forceDeleteInteraction,
};
