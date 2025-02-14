const apiUrl = process.env.REACT_APP_API_URL;

export interface Client {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  preference?: string;
  password?: string;
}

const searchClient = async (
  firstname: string,
  lastname: string,
  email: string
) => {
  try {
    const queryParams = new URLSearchParams({
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
    });

    const response = await fetch(
      `${apiUrl}/clients/search?${queryParams.toString()}`,
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

const getAllClients = async (currentPage: number = 1) => {
  try {
    const response = await fetch(`${apiUrl}/clients?page=${currentPage}`, {
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

const getClientById = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/clients/${id}`, {
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

const getDeletedClients = async (currentPage: number = 1) => {
  try {
    const response = await fetch(
      `${apiUrl}/clients/trashed?page=${currentPage}`,
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

const getDuplicates = async () =>{
  try{
    const response = await fetch(`${apiUrl}/clients/check-duplicates`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      }
    });
    return await response.json()
  }catch(error){
    if(error instanceof Error) console.log("error 1 :", error.message);
  }
}

const updateClient = async (id: number, clientData: Client) => {
  try {
    const updatedClient = {
      firstname: clientData?.firstname || undefined,
      lastname: clientData?.lastname || undefined,
      email: clientData?.email || undefined,
      phone: clientData?.phone || undefined,
      preference: clientData?.preference || null,
      password: clientData?.password || undefined,
    };

    console.log("api");
    console.log(clientData);
    console.log(updatedClient);

    const response = await fetch(`${apiUrl}/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
      body: JSON.stringify(updatedClient),
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const createNewClient = async (client: Client) => {
  try {
    const response = await fetch(`${apiUrl}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
      body: JSON.stringify({
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        phone: client.phone || undefined,
        preference: client.preference || undefined,
        password: client.password || undefined,
      }),
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const restoreClient = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/clients/${id}/restore`, {
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

const deleteClient = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/clients/${id}`, {
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

// Permanently delete a user
const forceDeleteClient = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/clients/${id}/force-delete`, {
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

const getEnrolledServices = async (clientId: number) => {
  try {
    const response = await fetch(`${apiUrl}/clients/${clientId}/services`, {
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

const enrollService = async (clientId: number, serviceId: number) => {
  try {
    const response = await fetch(`${apiUrl}/clients/${clientId}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
      body: JSON.stringify({
        serviceId: serviceId,
      }),
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const removeEnrolledService = async (clientId: number, serviceId: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/clients/${clientId}/services/${serviceId}`,
      {
        method: "DELETE",
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

const forceRemoveEnrolledService = async (
  clientId: number,
  serviceId: number
) => {
  try {
    const response = await fetch(
      `${apiUrl}/clients/${clientId}/services/${serviceId}/force-delete`,
      {
        method: "DELETE",
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

export {
  searchClient,
  getAllClients,
  getClientById,
  getDeletedClients,
  getDuplicates,
  createNewClient,
  updateClient,
  deleteClient,
  restoreClient,
  forceDeleteClient,
  getEnrolledServices,
  enrollService,
  removeEnrolledService,
  forceRemoveEnrolledService,
};
