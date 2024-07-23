# Función para actualizar los datos de un objeto
def set_data(table, data):
  for key, value in data.items():
    setattr(table, key, value)
