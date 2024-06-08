
#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install mpv using the appropriate package manager
install_mpv() {
    if command_exists apt; then
        echo "Detected Debian-based system. Installing mpv..."
        sudo apt update
        sudo apt install -y mpv
    elif command_exists dnf; then
        echo "Detected Fedora-based system. Installing mpv..."
        sudo dnf install -y mpv
    elif command_exists yum; then
        echo "Detected CentOS-based system. Installing mpv..."
        sudo yum install -y mpv
    elif command_exists pacman; then
        echo "Detected Arch-based system. Installing mpv..."
        sudo pacman -Syu mpv --noconfirm
    else
        echo "Unsupported package manager. Please install mpv manually."
        exit 1
    fi
}

# Check if mpv is installed
if command_exists mpv; then
    echo "mpv is already installed."
else
    install_mpv
fi
