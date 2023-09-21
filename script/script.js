//Simulador de peso en otro mundos

while(true){
    alert("¡Bienvenido a PlanetGravity! 🚀\nSomos tu simulador de peso en otros mundos. ¿Preparado para saber cuanto pesarías en la Luna, Marte o en el Sol?")

    let pesoUsuario;

    do{
        pesoUsuario = prompt("¡Genial! 🪐\nPrimero lo primero, ingresa tu peso en kg. Prometemos mantener tu información en secreto 🤫.");

        if(pesoUsuario === null){
            alert("Acabas de cancelar la operación. 🔭");
            break;
        };

        pesoUsuario = Number(pesoUsuario);

        if(isNaN(pesoUsuario) || pesoUsuario <= 0){
            alert("Ouch, probemos otra vez. Tienes que ingresar un peso válido y mayor que cero.");
        } else{
            let calcularPeso = prompt(`Bien, ya tenemos tu peso 📔.

    Ahora vamos a elegir el mundo:
    🔹Escribe 1 para calcular tu peso en la Luna
    🔹Escribe 2 para calcular tu peso en Marte
    🔹Presiona 3 para calcular tu peso en el Sol`);

            switch(calcularPeso){
                case "1":
                    pesoCalculado = ((pesoUsuario/9.8) * 1.622).toFixed(2);
                    alert(`¡Todo listo! 🚀
                    
La gravedad en la Luna es aproximadamente el 16.6% de la gravedad de la Tierra. Esto significa que si tu peso en la Tierra es de ${pesoUsuario} kg, tu peso en la Luna sería de aproximadamente ${pesoCalculado} kg.`);
                    break;
                case "2":
                    pesoCalculado = ((pesoUsuario/9.8) * 3.711).toFixed(2);
                    alert(`¡Todo listo! 🚀
                
La gravedad en Marte es aproximadamente el 38% de la gravedad de la Tierra. Esto significa que si tu peso en la Tierra es de ${pesoUsuario} kg, tu peso en Marte sería de aproximadamente ${pesoCalculado} kg.`);
                    break;
                case "3":
                    pesoCalculado = ((pesoUsuario/9.8) * 274).toFixed(2);
                    alert(`¡Todo listo! 🚀
                                    
La gravedad en el Sol es aproximadamente el 274% de la gravedad de la Tierra. Esto significa que si tu peso en la Tierra es de ${pesoUsuario} kg, tu peso en el Sol sería de aproximadamente ${pesoCalculado} kg.`);
                    break;
                default:
                    alert("No existe esa opción. Ingresa un opción válida 🔭.");
            }
        }

    } while(pesoUsuario == null);

        let volverACalcular = confirm("¿Quieres volver a calcular tu peso en otro mundo? 🚀")

        if(!volverACalcular){
            alert(`Cerrando PlanetGravity 🚀
...
...             
...

See you later!`)
            break;
        }
}
