function descargar(tipo, fechaInicio, fechaFin) {

  if (!fechaInicio || !fechaFin || !tipo) {
    alert("Debe completar todos los campos");
    return;
  }

  const params = new URLSearchParams({
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    tipo: tipo
  });

  const url = `http://localhost:3000/api/downloads?${params.toString()}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la descarga");
      }
      return response.blob();
    })
    .then(blob => {
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadURL;
      link.download = `${tipo}_${fechaInicio}_a_${fechaFin}.xlsx`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(downloadURL);
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error("Error:", error);
      alert("No se pudo descargar el archivo");
    });
}