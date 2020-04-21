#!/bin/bash
cd backend
gunicorn app:app --daemon
python worker.py