# //////////////////////////////////////
# Q1 
# Q1 ///////////////////////////////////
# Q1 
# //////////////////////////////////////

# Trouver les indices des lettres minuscules (a-z)
# for lettre in 'abcdefghijklmnopqrstuvwxyz':
#     print(f"Lettre : {lettre}, Indice : {ord(lettre)}")

# # Trouver les indices des lettres majuscules (A-Z)
# for lettre in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
#     print(f"Lettre : {lettre}, Indice : {ord(lettre)}")

# # Trouver les indices des caractères ASCII courants
# for indice in range(32, 128):  # ASCII visible
#     print(f"Indice : {indice}, Caractère : {chr(indice)}")

# def convertir_en_codes(chaine):
#     """
#     Convertit une chaîne de caractères en une liste de codes Unicode.
    
#     Arguments :
#     - chaine (str) : La chaîne à convertir.
    
#     Retourne :
#     - list[int] : Une liste des codes Unicode correspondants.
#     """
#     return [ord(c) for c in chaine]

# # Exemple d'utilisation
# texte = "NINO"
# codes = convertir_en_codes(texte)
# print(f"Texte : {texte}")
# print(f"Codes : {codes}")


# //////////////////////////////////////////////
# # Q2
# # Q2 /////////////////////////////////////////
# # Q2
# //////////////////////////////////////////////

# Q2A

# def shift_caractere(c, n):
#     """
#     Décale un caractère dans l'alphabet de n positions si c'est une lettre minuscule.
    
#     Arguments :
#     - c (str) : Le caractère à décaler.
#     - n (int) : Le nombre de positions à décaler (0 ≤ n < 26).
    
#     Retourne :
#     - str : Le caractère décalé ou le caractère original si ce n'est pas une lettre minuscule.
#     """
#     # Vérifier si c est une lettre minuscule
#     if 'a' <= c <= 'z':
#         # Calculer la nouvelle position
#         nouvelle_position = (ord(c) - ord('a') + n) % 26
#         # Retourner le nouveau caractère
#         return chr(ord('a') + nouvelle_position)
#     else:
#         # Retourner c tel quel s'il n'est pas une lettre minuscule
#         return c

# # Exemple d'utilisation
# print(shift_caractere('a', 4))  
# print(shift_caractere('z', 1))  
# print(shift_caractere('!', 5))
# print(shift_caractere('M', 5)) 


# Q2B

# def KGen():
#     """
#     Génère une clé pour le chiffrement de César.
    
#     Retourne :
#     - int : Un entier entre 0 et 25.
#     """
#     import random
#     return random.randint(0, 25)

# def Enc(texte, n):
#     """
#     Chiffre un texte en utilisant le chiffrement de César.
    
#     Arguments :
#     - texte (str) : Le texte à chiffrer.
#     - n (int) : La clé de chiffrement (décalage).
    
#     Retourne :
#     - str : Le texte chiffré.
#     """
#     resultat = ""
#     for c in texte:
#         if 'a' <= c <= 'z':  # Si c'est une lettre minuscule
#             nouvelle_position = (ord(c) - ord('a') + n) % 26
#             resultat += chr(ord('a') + nouvelle_position)
#         else:
#             resultat += c  # Garde les autres caractères inchangés
#     return resultat


# def Dec(texte_chiffre, n):
#     """
#     Déchiffre un texte chiffré avec le chiffrement de César.
    
#     Arguments :
#     - texte_chiffre (str) : Le texte chiffré.
#     - n (int) : La clé de chiffrement (décalage).
    
#     Retourne :
#     - str : Le texte déchiffré.
#     """
#     resultat = ""
#     for c in texte_chiffre:
#         if 'a' <= c <= 'z':  # Si c'est une lettre minuscule
#             nouvelle_position = (ord(c) - ord('a') - n) % 26
#             resultat += chr(ord('a') + nouvelle_position)
#         else:
#             resultat += c  # Garde les autres caractères inchangés
#     return resultat


# # Générer une clé
# cle = KGen()
# print(f"Clé générée : {cle}")

# # Texte original
# texte_original = "hello world"
# print(f"Texte original : {texte_original}")

# # Chiffrement
# texte_chiffre = Enc(texte_original, cle)
# print(f"Texte chiffré : {texte_chiffre}")

# # Déchiffrement
# texte_dechiffre = Dec(texte_chiffre, cle)
# print(f"Texte déchiffré : {texte_dechiffre}")

# Q2C

def Dec(texte_chiffre, n):
    """
    Déchiffre un texte chiffré avec le chiffrement de César.
    
    Arguments :
    - texte_chiffre (str) : Le texte chiffré.
    - n (int) : La clé de chiffrement (décalage).
    
    Retourne :
    - str : Le texte déchiffré.
    """
    resultat = ""
    for c in texte_chiffre:
        if 'a' <= c <= 'z':  # Si c'est une lettre minuscule
            nouvelle_position = (ord(c) - ord('a') - n) % 26
            resultat += chr(ord('a') + nouvelle_position)
        else:
            resultat += c  # Garde les autres caractères inchangés
    return resultat

def dechiffrer(fichier_entree, cle):
    """
    Déchiffre un fichier texte en utilisant le chiffrement de César et affiche le résultat dans le terminal.
    
    Arguments :
    - fichier_entree (str) : Le chemin du fichier chiffré.
    - cle (int) : La clé de déchiffrement (décalage).
    """
    try:
        # Lire le contenu du fichier
        with open(fichier_entree, 'r', encoding='utf-8') as fichier:
            texte_chiffre = fichier.read()
        
        # Déchiffrer le contenu
        texte_dechiffre = Dec(texte_chiffre, cle)
        
        # Afficher le résultat dans le terminal
        print("Texte déchiffré :")
        print(texte_dechiffre)
    except FileNotFoundError:
        print(f"Le fichier '{fichier_entree}' n'existe pas.")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")

# Exemple d'utilisation
fichier_chiffre = "cesar.txt"  # Chemin du fichier chiffré
cle = 9  # Exemple de clé utilisée pour le déchiffrement

# Déchiffrer et afficher le résultat dans le terminal
dechiffrer(fichier_chiffre, cle)
